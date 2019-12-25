<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEcardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ecards', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('salutation')->index();
            $table->text('message', 60000);
            $table->string('velediction')->index();
            $table->string('handle', 32);
            $table->timestamps();
        });

        Schema::create('ecard_logs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('ecard_id');
            $table->ipAddress('ip')->index();
            $table->foreign('ecard_id')->references('id')->on('ecards');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ecard_logs');
        Schema::dropIfExists('ecards');
    }
}
