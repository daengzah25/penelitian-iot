<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('animals', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique(); // kode/tag hewan
            $table->string('name')->nullable();
            $table->enum('species', ['sapi', 'kambing']);
            $table->date('birth_date')->nullable();
            $table->string('owner')->nullable(); // pemilik/kelompok ternak
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('animals');
    }
};
