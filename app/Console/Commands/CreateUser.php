<?php

namespace App\Console\Commands;

use App\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class CreateUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:user {--email=} {--password=} {--name=} {--role=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a user email';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {

        try {
            $email = $this->option('email');
            $password = $this->option('password');
            $name = $this->option('name');
            $role = $this->option('role');


            if (!$email || !$password || !$name || !$role) {
                throw new \InvalidArgumentException("Invalid Arguments.");
            }

            if (strlen($password) < 6) {
                throw new \InvalidArgumentException("Password must be atleast 6 characters long");
            }

            $user = new User();
            $user->password = Hash::make($password);
            $user->email = $email;
            $user->name = $name;
            $user->role = $role;

            if (!$user->save()) {
                throw new \ErrorException("Was unable to create user");
            }

            $this->line("Successfully Created User");

        } catch (\Exception $exception) {
            $this->error($exception->getMessage());
        }
    }
}
