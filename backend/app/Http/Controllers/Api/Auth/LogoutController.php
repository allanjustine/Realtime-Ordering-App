<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LogoutController extends Controller
{
    public function logout()
    {
        $user = auth()->user();

        $user->update([
            'remember_token'        =>          null,
        ]);

        $user->tokens()->delete();

    }
}
