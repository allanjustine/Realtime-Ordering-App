<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'email'                 =>              ['required', 'email', 'string', 'lowercase'],
            'password'              =>              ['required', 'string', 'min:8'],
        ]);

        if ($validation->fails()) {
            return response()->json([
                'status'            =>          false,
                'message'           =>          'We have an errors',
                'errors'            =>          $validation->errors()
            ], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'status'            =>          false,
                'message'           =>          'We could not find any user with the email you inputted',
            ], 404);
        }

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {

            $user->tokens()->delete();

            return response()->json([
                'status'            =>          true,
                'message'           =>          'You successfully logged in',
                'user'              =>          $user,
                'token'             =>          $user->createToken('API Token')->plainTextToken
            ], 200);
        }

        return response()->json([
            'status'            =>          false,
            'message'           =>          'Invalid credentials. Please try again.',
        ], 404);
    }
}
