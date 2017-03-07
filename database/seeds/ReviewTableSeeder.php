<?php

use Illuminate\Database\Seeder;
use App\Review;
use Faker\Factory as Faker;

class ReviewTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        
        DB::table('reviews')->delete();

        for ($i = 1; $i < 500; $i++) {
            $review = new Review();
            $review->textscore = $faker->text;
            $review->score = rand(1, 5);
            $review->author_id = rand(1, 200);
            $review->created_at = \Carbon\Carbon::now();
            $review->updated_at = \Carbon\Carbon::now();
            $review->save();
        }
    }
}
