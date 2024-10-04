<?php

namespace App\Http\Controllers\API\Profile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        if(!$user)
        {
            return response()->json([
                'status'        =>          false,
                'message'       =>          'Failed to load, Unauthorized',
            ], 401);
        }

        return response()->json([
            'status'        =>          true,
            'user'          =>          $user
        ], 200);
    }
}
