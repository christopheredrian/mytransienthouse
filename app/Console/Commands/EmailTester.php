<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Mail;

class EmailTester extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send:test-email {--email=} {--name=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send test email to a user';

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
        $to_name = $this->option('name');
        $to_email = $this->option('email');

        $data = [
            'name' => $to_name,
            "body" => "This is a test mail"
        ];

        Mail::send('emails.test', $data, function ($message) use ($to_name, $to_email) {

            /** @var Message $message */
            $message->to($to_email, $to_name)
                ->subject("My Transient House Test Mail");
            $message->from('mytransienthouse@gmail.com', 'Mytransienthouse');
        });
    }
}
