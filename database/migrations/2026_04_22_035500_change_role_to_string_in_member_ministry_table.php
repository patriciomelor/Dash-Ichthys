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
        Schema::table('member_ministry', function (Blueprint $table) {
            $table->string('role', 50)->default('integrante')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('member_ministry', function (Blueprint $table) {
            // Note: going back to ENUM might fail if there are values outside the ENUM
            // This is just a best effort fallback
            $table->enum('role', ['lider', 'colaborador'])->default('colaborador')->change();
        });
    }
};
