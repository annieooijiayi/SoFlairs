<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    //

    function register(Request $request){

        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191',
            'username' => 'required|max:191|unique:users,username',
            'email' => 'required|email|max:191|unique:users,email',
            'userpassword'=>'required|min:8',
        ]);

        if ($validator->fails()){
            return response()->json([
                'validation_errors'=>$validator->messages(),
            ]);
        }

        else{
            $user = User::create([
                'name' => $request->name,
                'username' => $request->username,
                'email' => $request->email,
                'userpassword' => Hash::make($request->userpassword)
            ]);

            $token = $user->createToken($user->email.'_Token')->plainTextToken;

            return response()->json([
                'status'=>200,
                'token' => $token,
                'username' => $user -> username,
                'message' => 'Registered Successfully',
            ]);
        }
    }

    public function login(Request $request){
         $validator = Validator::make($request->all(),[
             'username'=>'required|max:191',
             'userpassword' => 'required'
         ]);

         if($validator->fails()){
            return response()->json([
                'validation_errors'=>$validator->messages(),
            ]);
         }
         else{
            $user = User::where('username', $request->username)->first();
 
            if (! $user || ! Hash::check($request->userpassword, $user->userpassword)) {
                return response()->json([
                    'status'=>401,
                    'message'=>'Invalid Credentials'
                ]);
            }
            else{

                if ($user->role == 1){
                    $role = 'admin';
                    $token = $user->createToken($user->email.'_AdminToken', ['server:admin'])->plainTextToken;
                }
                else{
                    $role = '';
                    $token = $user->createToken($user->email.'_Token', [''])->plainTextToken;
                }

                return response()->json([
                    'status'=>200,
                    'token' => $token,
                    'username' => $user -> username,
                    'message' => 'Logged In Successfully',
                    'role' => $role,
                ]);
            }
         }
    }

    public function logout(){
        auth()->user()->tokens()->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Logged Out Successfully',
        ]);
    }
}
