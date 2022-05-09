<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CheckoutController extends Controller
{
    public function placeorder(Request $request){
        if (auth('sanctum')->check()){
            $validator = Validator::make($request->all(), [
                'fullname' => 'required|max:191',
                'phone' => 'required|max:191',
                'email' => 'required|email|max:191',
                'address' => 'required|max:191',
                'city' => 'required|max:191',
                'state' => 'required|max:191',
                'zipcode' => 'required|max:191'
            ]);

            if ($validator -> fails()){
                return response()->json([
                    'status'=>422,
                    'errors'=>$validator->messages()
                ]);
            }
            else{
                $user_id = auth('sanctum')->user()->id;
                $order = new Order;
                $order->user_id = $user_id;
                $order->fullname = $request->fullname;
                $order->phone = $request->phone;
                $order->email = $request->email;
                $order->address = $request->address;
                $order->city = $request->city;
                $order->state = $request->state;
                $order->zipcode = $request->zipcode;
                $order->payment_mode = $request->payment_mode;
                $order->payment_id = $request->payment_id;
                $order->tracking_num = 'flairs'.rand(10000,99999);
                $order->save();

                $cart = Cart::where('user_id', $user_id)->get();
                
                $order_items = [];
                foreach($cart as $item){
                    $order_items[] = [
                        'product_id'=>$item->product_id,
                        'qty'=>$item->product_qty,
                        'price'=>$item->product->selling_price
                    ];

                    $item->product->update([
                        'qty' => $item->product->qty - $item->product_qty
                    ]);
                }

                $order->orderitems()->createMany($order_items);
                Cart::destroy($cart);
                
                return response()->json([
                    'status'=>200,
                    'message'=>"Order placed successfully"
                ]);
            }
        }
        else{
            return response()->json([
                'status'=>401,
                'message'=>'Login to proceed'
            ]);
        }
    }

    public function validateorder(Request $request){
        if (auth('sanctum')->check()){
            $validator = Validator::make($request->all(), [
                'fullname' => 'required|max:191',
                'phone' => 'required|max:191',
                'email' => 'required|email|max:191',
                'address' => 'required|max:191',
                'city' => 'required|max:191',
                'state' => 'required|max:191',
                'zipcode' => 'required|max:191'
            ]);

            if ($validator -> fails()){
                return response()->json([
                    'status'=>422,
                    'errors'=>$validator->messages()
                ]);
            }
            else{
                return response()->json([
                    'status'=>200,
                    'message'=>"Form validated successfully"
                ]);
            }
        }
        else{
            return response()->json([
                'status'=>401,
                'message'=>'Login to proceed'
            ]);
        }
    }
}
