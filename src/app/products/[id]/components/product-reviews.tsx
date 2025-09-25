"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/custom-card";
import { Button } from "@/components/ui/custom-button";
import { Badge } from "@/components/ui/custom-badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/custom-avatar";
import { Progress } from "@/components/ui/custom-progress";

interface ProductReviewsProps {
  productId: string;
  rating: number;
  reviewCount: number;
}

const mockReviews = [
  {
    id: "1",
    author: "Sarah Johnson",
    avatar: "/placeholder.svg?key=avatar1",
    rating: 5,
    date: "2024-01-15",
    title: "Excellent quality!",
    content:
      "This shirt exceeded my expectations. The fabric is soft and comfortable, and the fit is perfect. Highly recommend!",
    verified: true,
    helpful: 12,
  },
  {
    id: "2",
    author: "Mike Chen",
    avatar: "/placeholder.svg?key=avatar2",
    rating: 4,
    date: "2024-01-10",
    title: "Great value for money",
    content:
      "Good quality shirt at a reasonable price. The only minor issue is that it wrinkles easily, but overall very satisfied.",
    verified: true,
    helpful: 8,
  },
  {
    id: "3",
    author: "Emily Davis",
    avatar: "/placeholder.svg?key=avatar3",
    rating: 5,
    date: "2024-01-05",
    title: "Perfect fit and style",
    content:
      "Love this shirt! It fits exactly as expected and the color is beautiful. Will definitely order more colors.",
    verified: false,
    helpful: 15,
  },
];

export function ProductReviews({
  productId,
  rating,
  reviewCount,
}: ProductReviewsProps) {
  const [reviews] = useState(mockReviews);

  const ratingDistribution = [
    { stars: 5, count: 78, percentage: 63 },
    { stars: 4, count: 31, percentage: 25 },
    { stars: 3, count: 10, percentage: 8 },
    { stars: 2, count: 3, percentage: 2 },
    { stars: 1, count: 2, percentage: 2 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Rating Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold mb-2">{rating}</div>
                  <div className="flex items-center justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${
                          i < Math.floor(rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    Based on {reviewCount} reviews
                  </p>
                </div>

                <div className="space-y-3">
                  {ratingDistribution.map((item) => (
                    <div
                      key={item.stars}
                      className="flex items-center space-x-3"
                    >
                      <span className="text-sm w-6">{item.stars}★</span>
                      <Progress value={item.percentage} className="flex-1" />
                      <span className="text-sm text-muted-foreground w-8">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>

                <Button className="w-full mt-6">Write a Review</Button>
              </CardContent>
            </Card>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-6">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage
                        src={review.avatar || "/placeholder.svg"}
                        alt={review.author}
                      />
                      <AvatarFallback>
                        {review.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold">{review.author}</h4>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verified Purchase
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${
                                i < review.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <h5 className="font-medium mb-2">{review.title}</h5>
                      <p className="text-muted-foreground mb-3">
                        {review.content}
                      </p>
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm">
                          Helpful ({review.helpful})
                        </Button>
                        <Button variant="ghost" size="sm">
                          Report
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="text-center">
              <Button variant="outline">Load More Reviews</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
