<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddAccountSettingsToAccounts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('accounts', function (Blueprint $table) {
            $table->enum('account_type', ['premium', 'standard'])
                ->default('standard')
                ->comment("Account type: premium - subdomain based account. Standard: subfolder based account")
                ->after('business_name')
                ->index();

            $table->jsonb('home_ui_details_json')
                ->comment('UI Details for Home page for account')
                ->after('account_type');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('accounts', function (Blueprint $table) {
            $table->dropColumn('account_type');
            $table->dropColumn('home_ui_details_json');
        });
    }
}
