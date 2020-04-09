<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ModifyUserRoles extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared("
            ALTER TABLE `users` DROP `role`;
        ");

        DB::unprepared("
            ALTER TABLE `users` ADD `account_id` BIGINT  UNSIGNED  NULL  DEFAULT NULL  AFTER `id`;
            ALTER TABLE `users` ADD INDEX (`account_id`);
            ALTER TABLE `users` ADD FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
        ");

        DB::unprepared("
            ALTER TABLE `users` ADD `role` ENUM('admin','business_owner','customer')  NULL  DEFAULT NULL  AFTER `account_id`;
            ALTER TABLE `users` ADD INDEX (`role`);
        ");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared("ALTER TABLE `users` DROP `role`");
        DB::unprepared("ALTER TABLE `users` DROP `account_id`");

        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['admin', 'businessowner', 'customer'])
                ->index();
        });
    }
}
