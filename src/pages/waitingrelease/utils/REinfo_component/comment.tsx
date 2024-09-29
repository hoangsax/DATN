import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'; // For star and thumbs icons

// Define the structure of the review object
interface Review {
  id: string;
  userName: string;
  userImage: string;
  rating: number;
  reviewText: string;
  reviewDate: string;
  helpfulCount: number;
  notHelpfulCount: number;
  images: string[];
}

// Sample data
const reviews: Review[] = [
  {
    id: '1',
    userName: 'Sandeep S.',
    userImage: 'https://example.com/avatar.jpg',
    rating: 5,
    reviewText: 'Lorem Ipsum is simply dummy text of the printing.',
    reviewDate: '2 months ago',
    helpfulCount: 1,
    notHelpfulCount: 2,
    images: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg'
    ]
  },
  {
    id: '2',
    userName: 'Sandeep S.',
    userImage: 'https://example.com/avatar.jpg',
    rating: 5,
    reviewText: 'Lorem Ipsum is simply dummy text of the printing.',
    reviewDate: '2 months ago',
    helpfulCount: 1,
    notHelpfulCount: 2,
    images: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg'
    ]
  }
];

const ReviewComponent: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Review</Text>

      {reviews.map((review) => (
        <View key={review.id} style={styles.reviewContainer}>
          {/* User Information */}
          <View style={styles.userInfoContainer}>
            <Image source={{ uri: review.userImage }} style={styles.avatar} />
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{review.userName}</Text>
              <Text style={styles.reviewDate}>{review.reviewDate}</Text>
            </View>
          </View>

          {/* Review Content */}
          <Text style={styles.reviewText}>{review.reviewText}</Text>

          {/* Rating */}
          <View style={styles.ratingContainer}>
            {Array.from({ length: review.rating }).map((_, index) => (
              <FontAwesome key={index} name="star" size={16} color="orange" />
            ))}
            <Text style={styles.ratingNumber}>{review.rating.toFixed(1)}</Text>
          </View>

          {/* Helpful Section */}
          <View style={styles.helpfulContainer}>
            <Text style={styles.helpfulText}>Helpful?</Text>
            <TouchableOpacity>
              <FontAwesome5 name="thumbs-up" size={16} color="black" />
            </TouchableOpacity>
            <Text style={styles.helpfulCount}>{review.helpfulCount}</Text>
            <TouchableOpacity>
              <FontAwesome5 name="thumbs-down" size={16} color="black" />
            </TouchableOpacity>
            <Text style={styles.helpfulCount}>{review.notHelpfulCount}</Text>
          </View>

          {/* Review Images */}
          <FlatList
            data={review.images}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.reviewImage} />
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      ))}

      {/* View All Reviews */}
      <TouchableOpacity>
        <Text style={styles.viewAllText}>View all 172 reviews</Text>
      </TouchableOpacity>
    </View>
  );
};

// Style definitions
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  reviewContainer: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  userDetails: {
    flexDirection: 'column',
  },
  userName: {
    fontWeight: 'bold',
  },
  reviewDate: {
    color: '#888',
    fontSize: 12,
  },
  reviewText: {
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingNumber: {
    marginLeft: 8,
    fontWeight: 'bold',
  },
  helpfulContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  helpfulText: {
    marginRight: 8,
  },
  helpfulCount: {
    marginHorizontal: 8,
  },
  reviewImage: {
    width: 100,
    height: 100,
    marginRight: 8,
    borderRadius: 8,
  },
  viewAllText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default ReviewComponent;
