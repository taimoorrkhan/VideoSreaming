import { useState,useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	Alert,
	FlatList,
	Image,
	RefreshControl,
	Text,
	View,
} from "react-native";

import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { getAllPosts } from "../../lib/appwrite";


const Home = () => {


	const [refreshing, setRefreshing] = useState(false);
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(false)
			try {
				const response = await getAllPosts();

				setData(response);
			}
			catch (error) {
				Alert.alert('Error',error.message)
			}
			finally {
				setIsLoading(false)
			}
		}
	})
	const onRefresh = async () => {
		setRefreshing(true);
/* 		await refetch(); */
		setRefreshing(false);
	};

	// one flatlist
	// with list header
	// and horizontal flatlist

	//  we cannot do that with just scrollview as there's both horizontal and vertical scroll (two flat lists, within trending)

	return (
		<SafeAreaView className="bg-primary h-full">
			<FlatList
				data={{
					id:1
				}}
				keyExtractor={(item) => item.$id}
				renderItem={({ item }) => (
				/* 	<VideoCard
						title={item.title}
						thumbnail={item.thumbnail}
						video={item.video}
						creator={item.creator.username}
						avatar={item.creator.avatar}
					/> */
					<Text>item.id</Text>
				)}
				ListHeaderComponent={() => (
					<View className="flex my-6 px-4 space-y-6">
						<View className="flex justify-between items-start flex-row mb-6">
							<View>
								<Text className="font-pmedium text-sm text-gray-100">
									Welcome Back
								</Text>
								<Text className="text-2xl font-psemibold text-white">
									JSMastery
								</Text>
							</View>

							<View className="mt-1.5">
								<Image
									source={images.logoSmall}
									className="w-9 h-10"
									resizeMode="contain"
								/>
							</View>
						</View>

					<SearchInput />

						<View className="w-full flex-1 pt-5 pb-8">
							<Text className="text-lg font-pregular text-gray-100 mb-3">
								Latest Videos
							</Text>

					 		<Trending posts={[]??[]} />
						</View>
					</View>
				)}
			 	ListEmptyComponent={() => (
					<EmptyState
						title="No Videos Found"
						subtitle="No videos created yet"
					/>
				)} 
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
			/>
		</SafeAreaView>
	);
};

export default Home;
