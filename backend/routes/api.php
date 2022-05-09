<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\CheckoutController;
use App\Http\Controllers\API\FrontendController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

{/*Route::post('register',[UserController::class, 'register']);*/}

Route::post('register',[AuthController::class, 'register']);
Route::post('login',[AuthController::class, 'login']);

Route::get('getCategory', [FrontendController::class, 'category']);
Route::get('fetch-products/{slug}', [FrontendController::class, 'product']);
Route::get('view-product-details/{category_slug}/{product_slug}', [FrontendController::class, 'viewproduct']);

Route::post('add-to-cart',[CartController::class, 'addtocart']);
Route::get('cart',[CartController::class, 'viewcart']);
Route::put('cart-update-quantity/{cart_id}/{scope}',[CartController::class, 'updatequantity']);
Route::delete('delete-cart-item/{cart_id}',[CartController::class, 'deletecartitem']);

Route::post('place-order',[CheckoutController::class, 'placeorder']);
Route::post('validate-order',[CheckoutController::class, 'validateorder']);


Route::middleware(['auth:sanctum', 'isAPIAdmin'])->group(function() {
    
    Route::get('/checkingAuthenticated', function() {
        return response() -> json(['message'=>'You are in', 'status' => 200], 200);
    });

    Route::post('store-category', [CategoryController::class, 'store']);
    Route::get('category', [CategoryController::class, 'index']);
    Route::get('edit-category/{id}', [CategoryController::class, 'edit']);
    Route::put('update-category/{id}', [CategoryController::class, 'update']);
    Route::delete('delete-category/{id}', [CategoryController::class, 'destroy']);
    Route::get('all-category', [CategoryController::class, 'allcategory']);
    
    Route::post('store-product', [ProductController::class, 'store']);
    Route::get('view-product', [ProductController::class, 'index']);
    Route::get('edit-product/{id}', [ProductController::class, 'edit']);
    Route::post('update-product/{id}', [ProductController::class, 'update']);

    Route::get('view-orders', [OrderController::class, 'index']);

});

Route::middleware(['auth:sanctum'])->group(function() {

    Route::post('logout', [AuthController::class, 'logout']);
});