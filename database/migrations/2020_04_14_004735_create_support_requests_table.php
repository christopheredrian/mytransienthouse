<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSupportRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('support_requests', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('account_id')
                ->nullable()
                ->index();
            $table->string('email')->nullable()->index();
            $table->enum('status', ['pending', 'marked_as_read'])
                ->default('pending')
                ->index();
            $table->string('full_name')->index();
            $table->string('phone')->nullable()->index();
            $table->string('subject')->index();
            $table->text('body');
            $table->string('reference_number')->unique()
                ->index()
                ->comment("Unique reference number hash for this support request");
            $table->timestamps();
            $table->foreign('account_id')
                ->references('id')
                ->on('accounts');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('support_requests');
    }
}
