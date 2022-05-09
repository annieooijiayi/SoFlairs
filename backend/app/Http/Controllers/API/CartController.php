<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function addtocart(Request $request){
        if (auth('sanctum')->check()){
            
            $user_id = auth('sanctum')->user()->id;
            $product_id = $request->product_id;
            $product_qty = $request->product_qty;

            $productCheck = Product::where('id', $product_id)->first();
            if ($productCheck){

                if (Cart::where('product_id', $product_id)->where('user_id', $user_id)->exists()){
                    return response()->json([
                        'status'=>409,
                        'message'=>$productCheck->name .' already existed in cart'
                    ]);
                }
                else{
                    $cart_item = new Cart;
                    $cart_item->user_id =$user_id;
                    $cart_item->product_id = $product_id;
                    $cart_item->product_qty = $product_qty;
                    $cart_item->save();

                    return response()->json([
                        'status'=>201,
                        'message'=>'Added to cart successfully'
                    ]);
                }
                
            }
            else{
                return response()->json([
                    'status'=>404,
                    'message'=>'Product Not Found'
                ]);
            }

            
        }
        else{
            return response()->json([
                'status'=>401,
                'message'=>'Login to proceed the action'
            ]);
        }
    }

    public function viewcart(){
        if (auth('sanctum')->check()){
            $user_id = auth('sanctum')->user()->id;
            $cart_items = Cart::where('user_id', $user_id)->get();
            return response()->json([
                'status'=>200,
                'cart'=>$cart_items
            ]);
        }
        else{
            return response()->json([
                'status'=>401,
                'message'=>'Login to proceed action'
            ]);
        }
    }

    public function updatequantity($cart_id, $scope){
        if (auth('sanctum')->check()){
            $user_id = auth('sanctum')->user()->id;
            $cart_item = Cart::where('id', $cart_id)->where('user_id', $user_id)->first();
            
            if ($scope == 'inc'){
                $cart_item->product_qty += 1; 
            }
            else if ($scope == 'dec'){
                $cart_item->product_qty -= 1;
            }
            $cart_item->update();
            return response()->json([
                'status'=>200,
                'message'=>'Quantity Updated'
            ]);
            
        }
        else{
            return response()->json([
                'status'=>401,
                'message'=>'Login to proceed action'
            ]);
        }
    }

    public function deletecartitem($cart_id){
        if (auth('sanctum')->check()){
            $user_id = auth('sanctum')->user()->id;
            $cart_item = Cart::where('id', $cart_id)->where('user_id', $user_id)->first();

            if ($cart_item){
                $cart_item->delete();
                return response()->json([
                    'status'=>200,
                    'message'=>'Cart item removed successfully'
                ]);
            }
            else{
                return response()->json([
                    'status'=>404,
                    'message'=>'Cart item not found'
                ]);
            }
        }
        else{
            return response()->json([
                'status'=>401,
                'message'=>'Login to proceed action'
            ]);
        }
    }
}
