<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $this->call(UserTableSeeder::class);
        $this->command->info('Created members');
		$this->call(ReviewTableSeeder::class);
        $this->command->info('Created reviews');
		
        Model::reguard();
    }
}
