<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{

    protected $dates = ['deleted_at'];

    protected $guarded  = array('id');
    
    /**
	 * Returns a formatted post content entry,
	 * this ensures that line breaks are returned.
	 *
	 * @return string
	 */
	public function name()
	{
		return nl2br($this->name);
	}

	/**
	 * Returns a formatted post content entry,
	 * this ensures that line breaks are returned.
	 *
	 * @return string
	 */
	public function phone()
	{
		return nl2br($this->phone);
	}

	/**
	 * Returns a formatted post content entry,
	 * this ensures that line breaks are returned.
	 *
	 * @return string
	 */
	public function address()
	{
		return nl2br($this->address);
	}

}
