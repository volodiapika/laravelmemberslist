<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\User;
use App\Review;

use Response;

use App\Helpers\StringHelper;

class HomeController extends Controller
{

    /**
  	 * Show the application dashboard to the home.
  	 *
  	 * @return Response
  	 */
  	public function index()
  	{
        $users = Review
            ::join('users', 'users.id', '=', 'reviews.author_id')
            ->select(
                  array(
                        'users.id',
                        'users.name',
                        'users.address',
                        'users.phone',
                        'users.created_at',
                        'reviews.textscore',
                        'reviews.score',
                        'reviews.created_at as review_created_at'
                  )
            )
            ->distinct()
            //->orderBy('reviews.created_at', 'DESC')
            ->get();

  		  return view('home.index', compact('users'));
  	}

}
