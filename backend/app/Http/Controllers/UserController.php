<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    //
    function register(Request $req){

        $user = new User;
        $user->name = $req->input('name');
        $user->username = $req->input('username');
        $user->email = $req->input('email');
        $user->userpassword = Hash::make($req->input('userpassword'));
        
        $user->save();
        return $user;
    }
}
