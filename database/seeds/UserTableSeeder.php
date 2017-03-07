<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->delete();

    	$faker = Faker::create();
    	
    	for ($i = 0; $i < 200; $i++) {
	        \App\User::create([
				'name' => $faker->name,
				'phone' => $faker->tollFreePhoneNumber,
				'address' => $faker->address,
				'created_at' => \Carbon\Carbon::now(),
				'updated_at' => \Carbon\Carbon::now()
			]);
    	}
    }
}
