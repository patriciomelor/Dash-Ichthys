<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Member;
use App\Models\Ministry;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::today();
        
        // 1. Contador de ministerios y cantidad de miembros por ministerios
        $ministries = Ministry::withCount('members')->orderBy('name')->get();

        // 2. Contador de miembros y clases
        // Because labels are stored as JSON, we can fetch all members to compute stats quickly if the table is small,
        // or use DB queries. Let's use DB queries for better performance.
        
        $totalPeople = Member::count();
        $totalMembers = Member::whereJsonContains('labels', 'miembro')->count();
        // The user might have 'asistente' or 'asistente regular' or 'asistente_regular'. Let's search by string cast for flexibility
        $totalAssistants = Member::where('labels', 'LIKE', '%asistente%')->count();
        
        $cessationCount = Member::whereNotNull('membership_cessation_date')->count();

        // Clases stats
        $classConnectCount = Member::whereNotNull('class_connect_1_date')->count();
        $classGrowCount = Member::whereNotNull('class_grow_2_date')->count();
        $classEquipCount = Member::whereNotNull('class_equip_date')->count();
        
        $withoutConnectCount = Member::whereNull('class_connect_1_date')->count();
        $withoutGrowCount = Member::whereNull('class_grow_2_date')->count();
        $withoutEquipCount = Member::whereNull('class_equip_date')->count();

        $membersStats = [
            'total' => $totalPeople,
            'members' => $totalMembers,
            'assistants' => $totalAssistants,
            'cessation' => $cessationCount
        ];

        $classesStats = [
            'connect' => ['completed' => $classConnectCount, 'pending' => $withoutConnectCount],
            'grow' => ['completed' => $classGrowCount, 'pending' => $withoutGrowCount],
            'equip' => ['completed' => $classEquipCount, 'pending' => $withoutEquipCount],
        ];

        // 3. Hoy: Cumpleaños, Aniversarios de Matrimonio, Aniversarios de Membresía
        // Only active members? Let's assume all non-deceased members.
        $aliveMembers = Member::where('is_deceased', false);

        $birthdays = (clone $aliveMembers)->whereMonth('birth_date', $today->month)
                                        ->whereDay('birth_date', $today->day)
                                        ->get();
        
        $marriageAnniversaries = (clone $aliveMembers)->whereMonth('marriage_date', $today->month)
                                                    ->whereDay('marriage_date', $today->day)
                                                    ->get();

        $membershipAnniversaries = (clone $aliveMembers)->whereMonth('membership_date', $today->month)
                                                      ->whereDay('membership_date', $today->day)
                                                      ->get();

        // Calcular años
        $birthdays->map(function ($member) use ($today) {
            $member->years = Carbon::parse($member->birth_date)->age;
            return $member;
        });

        $marriageAnniversaries->map(function ($member) use ($today) {
            $member->years = Carbon::parse($member->marriage_date)->diffInYears($today);
            return $member;
        });

        $membershipAnniversaries->map(function ($member) use ($today) {
            $member->years = Carbon::parse($member->membership_date)->diffInYears($today);
            return $member;
        });

        $todayEvents = [
            'birthdays' => $birthdays,
            'marriageAnniversaries' => $marriageAnniversaries,
            'membershipAnniversaries' => $membershipAnniversaries
        ];

        // 4. Agregados recientemente
        $recentMembers = Member::orderBy('created_at', 'desc')->take(5)->get();

        return Inertia::render('Dashboard', [
            'ministries' => $ministries,
            'membersStats' => $membersStats,
            'classesStats' => $classesStats,
            'todayEvents' => $todayEvents,
            'recentMembers' => $recentMembers
        ]);
    }
}
