<?php

namespace App\Http\Controllers\API\Carts;

use App\Events\OrderEvent;
use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\User;
use App\Notifications\OrderNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $carts = Cart::with(['user', 'product'])->where('user_id', Auth::user()->id)->orderBy('created_at', 'desc')->get();

        if ($carts->count() > 0) {
            return response()->json([
                'status'                =>          true,
                'carts'                 =>          $carts
            ], 200);
        } else {
            return response()->json([
                'status'                =>          false,
                'message'               =>          'Cart not found'
            ], 404);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $userId = Auth::user()->id;

        $validation = Validator::make($request->all(), [
            'user_id'                   =>              ['exists:users,id'],
            'product_id'                =>              ['required', 'exists:products,id'],
            'quantity'                  =>              ['numeric', 'min:1'],
        ]);

        if ($validation->fails()) {
            return response()->json([
                'status'            =>          false,
                'message'           =>          'We have some errors',
                'errors'            =>          $validation->errors()
            ], 422);
        }

        $cartItem = Cart::where('user_id', $userId)
            ->where('product_id', $request->product_id)
            ->first();

        if ($cartItem) {
            $cartItem->quantity += $request->quantity ?: 1;
            $cartItem->save();

            // event(new OrderEvent($cartItem));

            $user = User::find($cartItem->product->user_id);

            $user->notify(new OrderNotification($cartItem));

            return response()->json([
                'status'                =>              true,
                'message'               =>              $cartItem->product->name . ' added to cart successfully',
                'cart'                  =>              $cartItem
            ], 201);
        } else {
            $cart = Cart::create([
                'user_id'                   =>              $userId,
                'product_id'                =>              $request->product_id,
                'quantity'                  =>              $request->quantity ?: 1
            ]);

            // event(new OrderEvent($cart));

            $user = User::find($cart->product->user_id);

            $user->notify(new OrderNotification($cart));

            return response()->json([
                'status'                =>              true,
                'message'               =>              $cart->product->name . ' added to cart successfully',
                'cart'                  =>              $cart
            ], 201);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($cartId)
    {
        $cart = Cart::find($cartId);

        if ($cart) {
            $cart->delete();
            return response()->json([
                'status'        =>      true,
                'message'       =>      $cart->product->name . ' removed from cart successfully'
            ], 200);
        } else {
            return response()->json([
                'status'        =>      false,
                'message'       =>      'Cart item not found'
            ], 404);
        }
    }

    public function destroyMultiple(Request $request)
    {
        $ids = $request->input('ids');

        if (!is_array($ids) || empty($ids)) {
            return response()->json(['message' => 'Invalid input'], 400);
        }

        $cart = Cart::destroy($ids);

        return response()->json([
            'status'        =>      true,
            'message'       =>      $cart <= 1 ? $cart . ' cart item deleted successfully' : $cart . ' cart items deleted successfully'
        ], 200);
    }
}
