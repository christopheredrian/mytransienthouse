<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

/**
 * Class LoginTest
 * @package Tests\Feature
 * @group auth
 */
class LoginTest extends TestCase
{
    /**
     * @test
     */
    public function emailAndPasswordAreRequired()
    {

        $this->post('api/login')
            ->assertStatus(422)
            ->assertJson([
                'message' => 'The given data was invalid.',
            ]);
    }

    /**
     * @test
     */
    public function userCanLogin()
    {

        $email = 'testlogin@test.com';
        $password = '123passwordsss';

        $user = factory(User::class)->create([
            'email' => $email,
            'password' => bcrypt($password)
        ]);

        $payload = ['email' => $email, 'password' => $password];

        $this->post('api/login', $payload)
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'name',
                    'email',
                    'created_at',
                    'updated_at',
                    'api_token'
                ]
            ]);
    }
}
