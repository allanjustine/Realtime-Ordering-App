<?php

use App\Http\Controllers\API\Auth\LoginController;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\API\Carts\CartController;
use App\Http\Controllers\API\Products\ProductController;
use App\Http\Controllers\API\Profile\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);

Route::middleware("auth:sanctum")->group(function () {

    // GET
    Route::get('/profile', [ProfileController::class, 'index']);
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/carts', [CartController::class, 'index']);
    Route::get('/product-detail/{id}', [ProductController::class, 'show']);

    // POST
    Route::post('/add-product', [ProductController::class, 'store']);
    Route::post('/add-to-cart/{productId}', [CartController::class, 'store']);

    // DELETE
    Route::delete('/delete-cart-items', [CartController::class, 'destroyMultiple']);
    Route::delete('/delete-cart-item/{cartId}', [CartController::class, 'destroy']);
});
