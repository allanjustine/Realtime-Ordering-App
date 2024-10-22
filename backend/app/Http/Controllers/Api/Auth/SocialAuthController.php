<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        $googleUser = Socialite::driver('google')->user();
        return $this->handleUserLogin($googleUser);
    }

    protected function handleUserLogin($socialUser)
    {
        $user = User::where('email', $socialUser->getEmail())->first();

        if (!$user) {
            $temp_password = Str::random(20);
            $user = User::create([
                'profile_picture'           =>              $socialUser->getAvatar(),
                'name'                      =>              $socialUser->getName(),
                'email'                     =>              $socialUser->getEmail(),
                'google_id'                 =>              $socialUser->getId(),
                'password'                  =>              bcrypt($temp_password),
            ]);
        }

        Auth::login($user);

        $user->tokens()->delete();

        $token = $user->createToken('API Token')->plainTextToken;


        return redirect("http://localhost:5000/success-login/?token={$token}");
    }
}
