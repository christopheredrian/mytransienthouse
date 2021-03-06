<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFaqsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('faqs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('account_id')
                ->comment('What account the entry is associated')
                ->index();
            $table->unsignedBigInteger('user_id')
                ->comment('User who created entry')
                ->index();

            $table->string('faq_question',255);
            $table->mediumText('faq_answer');

            $table->softDeletes();
            $table->timestamps();

            $table->foreign('account_id')
                ->references('id')
                ->on('accounts');
            $table->foreign('user_id')
                ->references('id')
                ->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('faqs');
    }
}
