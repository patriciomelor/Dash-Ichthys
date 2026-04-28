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
            $table->date('conversion_date')->nullable();
            $table->date('baptism_date')->nullable();
            $table->date('class_connect_1_date')->nullable();
            $table->date('class_grow_2_date')->nullable();
            $table->date('class_equip_date')->nullable();
            $table->date('marriage_date')->nullable();
            $table->date('membership_date')->nullable();
            $table->date('birth_date')->nullable();
            $table->boolean('is_deceased')->default(false);
            $table->date('death_date')->nullable();
            $table->date('membership_cessation_date')->nullable();
            $table->date('reinstatement_date')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('members', function (Blueprint $table) {
            $table->dropColumn([
                'conversion_date',
                'baptism_date',
                'class_connect_1_date',
                'class_grow_2_date',
                'class_equip_date',
                'marriage_date',
                'membership_date',
                'birth_date',
                'is_deceased',
                'death_date',
                'membership_cessation_date',
                'reinstatement_date',
            ]);
        });
    }
};
