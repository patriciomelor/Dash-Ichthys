<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('members', function (Blueprint $table) {
            $table->json('labels')->nullable()->after('label');
        });

        // Migrate data
        $members = \Illuminate\Support\Facades\DB::table('members')->get();
        foreach ($members as $member) {
            $labelArray = [$member->label ?? 'miembro'];
            \Illuminate\Support\Facades\DB::table('members')
                ->where('id', $member->id)
                ->update(['labels' => json_encode($labelArray)]);
        }

        Schema::table('members', function (Blueprint $table) {
            $table->dropColumn('label');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('members', function (Blueprint $table) {
            $table->enum('label', ['miembro', 'visita', 'asistente_regular'])->default('miembro')->after('labels');
        });

        // Best effort down migration
        $members = \Illuminate\Support\Facades\DB::table('members')->get();
        foreach ($members as $member) {
            $labels = json_decode($member->labels, true) ?? ['miembro'];
            $firstLabel = $labels[0] ?? 'miembro';
            if (!in_array($firstLabel, ['miembro', 'visita', 'asistente_regular'])) {
                $firstLabel = 'miembro';
            }
            \Illuminate\Support\Facades\DB::table('members')
                ->where('id', $member->id)
                ->update(['label' => $firstLabel]);
        }

        Schema::table('members', function (Blueprint $table) {
            $table->dropColumn('labels');
        });
    }
};
