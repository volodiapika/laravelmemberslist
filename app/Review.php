<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
	
    protected $dates = ['deleted_at'];

    protected $guarded  = array('id');

	/**
	 * Returns a formatted post content entry,
	 * this ensures that line breaks are returned.
	 *
	 * @return string
	 */
	public function textscore()
	{
		return nl2br($this->textscore);
	}

	/**
	 * Returns a formatted post content entry,
	 * this ensures that line breaks are returned.
	 *
	 * @return string
	 */
	public function score()
	{
		return nl2br($this->score);
	}

	/**
	 * Get the post's author.
	 *
	 * @return User
	 */
	public function author_id()
	{
		return $this->belongsTo('App\User', 'id');
	}
	
}
