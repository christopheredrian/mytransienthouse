<?php
//
//namespace Tests\Feature;
//
//use Illuminate\Foundation\Testing\RefreshDatabase;
//use Illuminate\Foundation\Testing\WithFaker;
//use Tests\TestCase;
//
//class RegisterTest extends TestCase
//{
//
//    /**
//     * @test
//     * @group auth
//     */
//    public function userCanRegister()
//    {
//        $payload = [
//            'name' => 'John',
//            'email' => 'johnny123@test.com',
//            'password' => 'pas123321',
//            'password_confirmation' => 'pas123321',
//        ];
//
//        $this->post('api/register', $payload)
//            ->assertStatus(201)
//            ->assertJsonStructure([
//                'data' => [
//                    'id',
//                    'name',
//                    'email',
//                    'created_at',
//                    'updated_at',
//                    'api_token'
//                ]
//            ]);
//    }
//
//
//    /**
//     * @test
//     */
//    public function registrationRequiredFields()
//    {
//        $this->json('post', '/api/register')
//            ->assertStatus(422)
//            ->assertJson([
//                'errors' => [
//                    'name' => ['The name field is required.'],
//                    'email' => ['The email field is required.'],
//                    'password' => ['The password field is required.']
//                ]
//            ]);
//    }
//
//    /**
//     * @test
//     * @group only
//     */
//    public function requirePasswordConfirmation()
//    {
//        $payload = [
//            'name' => 'John',
//            'email' => 'johnny123@test.com',
//            'password' => 'pas123321',
////            'password_confirmation' => 'pas123321',
//        ];
//
//        $this->post('api/register', $payload)
//            ->assertStatus(400)
//            ->dump();
////            ->assertJsonStructure([
////                'errors' => [
////                    'password_confirm' => 'confirmation'
////                ]
////            ]);
//
//    }
//
//}
