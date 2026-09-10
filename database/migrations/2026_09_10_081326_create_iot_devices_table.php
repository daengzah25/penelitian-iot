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
        Schema::create('iot_devices', function (Blueprint $table) {
            $table->id();
            $table->string('device_code')->unique(); // kode unik alat
            $table->string('type')->nullable(); // misal: timbangan, sensor suhu
            $table->foreignId('animal_id')->nullable()->constrained()->nullOnDelete();
            $table->string('api_token', 64)->unique(); // buat autentikasi kirim data
            $table->timestamp('last_seen_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('iot_devices');
    }
};
