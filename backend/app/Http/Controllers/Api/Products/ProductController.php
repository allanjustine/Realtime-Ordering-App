<?php

namespace App\Http\Controllers\API\Products;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with('user')->inRandomOrder()->get();

        if ($products->count() > 0) {
            return response()->json([
                'status'                =>          true,
                'products'              =>          $products
            ], 200);
        } else {
            return response()->json([
                'status'                =>          false,
                'message'               =>          'Product not found'
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
        $validation = Validator::make($request->all(), [
            'user_id'              =>              ['required', 'exists:users,id'],
            'name'                 =>              ['required', 'string'],
            'description'          =>              ['required', 'string'],
            'price'                =>              ['required', 'numeric'],
            'old_price'            =>              ['required', 'numeric'],
            'quantity'             =>              ['required', 'numeric'],
            'images'               =>              ['required', 'array'],
            'images.*'             =>              ['required', 'image', 'mimes:jpeg,png,jpg,gif', 'max:1024'],
        ]);
        if ($validation->fails()) {
            return response()->json([
                'status'            =>          false,
                'message'           =>          'We have an errors',
                'errors'            =>          $validation->errors()
            ], 422);
        }

        $imagePaths = [];

        foreach ($request->file('images') as $image) {

            $originalFileName = $image->getClientOriginalName();

            $extension = $image->getClientOriginalExtension();

            $currentDate = now()->format('F-d-Y');

            $newFileName = "{$originalFileName}-{$currentDate}_" . uniqid() . ".{$extension}";

            $path = $image->storeAs('product/images', $newFileName, 'public');

            $imagePaths[] = $path;
        }

        $product = Product::create([
            'user_id'               =>              $request->user_id,
            'name'                  =>              $request->name,
            'description'           =>              $request->description,
            'price'                 =>              $request->price,
            'old_price'             =>              $request->old_price,
            'quantity'              =>              $request->quantity,
            'image_url'             =>              $imagePaths,
        ]);

        return response()->json([
            'status'            =>              true,
            'message'           =>              'Product added successfully',
            'product'           =>              $product
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Product::with('user')->find($id);

        if (!$product) {
            return response()->json([
                'status'            =>          false,
                'message'           =>          'Product not found'
            ], 404);
        } else {
            return response()->json([
                'status'            =>              true,
                'message'           =>              'Product found',
                'product'           =>              $product
            ], 200);
        }
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
    public function destroy(string $id)
    {
        //
    }
}
