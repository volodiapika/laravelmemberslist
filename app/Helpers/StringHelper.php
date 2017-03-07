<?php

namespace App\Helpers;

class StringHelper
{
    public static function escape($string)
    {
        return str_replace(
        	"\n",
        	'\n', 
        	str_replace(
        		'"',
        		'\"',
        		addcslashes(
        			str_replace(
        				"\r",
        				'',
        				(string)$string
        			),
        			"\0..\37'\\"
        		)
        	)
        );
    }   
}
