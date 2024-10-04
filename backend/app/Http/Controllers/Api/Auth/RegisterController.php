<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'name'                  =>              ['required', 'string', 'max:255'],
            'email'                 =>              ['unique:users,email', 'required', 'lowercase', 'email:rfc,dns'],
            'password'              =>              ['required', 'string', 'min:6', 'confirmed'],
        ]);

        if($validation->fails())
        {
            return response()->json([
                'status'            =>          false,
                'message'           =>          'We have an errors',
                'errors'            =>          $validation->errors()
            ], 422);
        }

        $user = User::create([
            'name'              =>              $request->name,
            'email'             =>              $request->email,
            'password'          =>              bcrypt($request->password),
        ]);

        return response()->json([
            'status'            =>          true,
            'message'           =>          'Your account is created successfully, you can login now',
            'user'              =>          $user
        ], 201);
    }
}
