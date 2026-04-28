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
        Schema::create('tags', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('bg_color')->default('#f3f4f6');
            $table->string('text_color')->default('#1f2937');
            $table->timestamps();
        });

        // Insert default tags
        DB::table('tags')->insert([
            ['name' => 'miembro', 'bg_color' => '#f3e8ff', 'text_color' => '#6b21a8', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'asistente regular', 'bg_color' => '#dbeafe', 'text_color' => '#1e40af', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'visita', 'bg_color' => '#f3f4f6', 'text_color' => '#1f2937', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tags');
    }
};
