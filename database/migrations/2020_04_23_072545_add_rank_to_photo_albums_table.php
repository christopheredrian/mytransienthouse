<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRankToPhotoAlbumsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('photo_albums', function (Blueprint $table) {
            $table->tinyInteger('rank')
                ->comment("Priority rank in displaying featured album")
                ->after('is_featured')
                ->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('photo_albums', function (Blueprint $table) {
            $table->dropColumn('rank');
        });
    }
}
