import React from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { useAmityElement, useCommunities, useUser } from '../../../v4/hook';
import TargetItem from './TargetItem/TargetItem';
import { Divider, useTheme } from 'react-native-paper';
import useAuth from '../../../hooks/useAuth';
import type { MyMD3Theme } from '../../../providers/amity-ui-kit-provider';
import CloseButtonIconElement from '../../PublicApi/Elements/CloseButtonIconElement/CloseButtonIconElement';
import { PageID, ComponentID, ElementID } from '../../../v4/enum';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export type FeedParams = {
  targetId: string;
  targetName: string;
  targetType: string;
  isPublic?: boolean;
  postSetting?: ValueOf<
    Readonly<{
      ONLY_ADMIN_CAN_POST: 'ONLY_ADMIN_CAN_POST';
      ADMIN_REVIEW_POST_REQUIRED: 'ADMIN_REVIEW_POST_REQUIRED';
      ANYONE_CAN_POST: 'ANYONE_CAN_POST';
    }>
  >;
  needApprovalOnPostCreation?: string;
};

interface ITargetSelectionPage {
  pageId: PageID;
  onSelectFeed: ({
    targetId,
    targetName,
    targetType,
    isPublic,
    postSetting,
    needApprovalOnPostCreation,
  }: FeedParams) => void;
}

const TargetSelectionPage = ({
  pageId,
  onSelectFeed,
}: ITargetSelectionPage) => {
  const { client } = useAuth();
  const user = useUser((client as Amity.Client).userId);
  const navigation = useNavigation();

  const { communities, onNextCommunityPage } = useCommunities();

  const { config: myTimelineConfig } = useAmityElement({
    pageId,
    componentId: ComponentID.WildCardComponent,
    elementId: ElementID.my_timeline_text,
  });
  const { config: titleConfig } = useAmityElement({
    pageId,
    componentId: ComponentID.WildCardComponent,
    elementId: ElementID.title,
  });

  const theme = useTheme() as MyMD3Theme;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      paddingVertical: 18,
      alignItems: 'center',
    },
    closeIcon: {
      width: 24,
      height: 24,
      tintColor: theme.colors.base,
    },
    closeButton: {
      position: 'absolute',
      left: 12,
      top: 18,
    },
    title: {
      fontSize: 17,
      fontWeight: '600',
      lineHeight: 22,
      color: theme.colors.base,
    },
    communityHeader: {
      color: theme.colors.baseShade1,
      fontSize: 15,
      lineHeight: 20,
      marginBottom: 8,
      marginHorizontal: 16,
    },
    divider: {
      marginTop: 8,
      marginBottom: 26,
      paddingHorizontal: 16,
    },
  });

  const renderItem = ({ item }: { item: Amity.Community }) => {
    return (
      <TargetItem
        key={item.communityId}
        displayName={item.displayName}
        // TODO: add logic to check isBadgeShow
        // isBadgeShow={true}
        isPrivate={!item.isPublic}
        onSelect={() =>
          onSelectFeed({
            targetId: item.communityId,
            targetName: item.displayName,
            targetType: 'community',
          })
        }
        avatarFileId={item.avatarFileId}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <CloseButtonIconElement
            style={styles.closeIcon}
            pageID={PageID.select_post_target_page}
          />
        </TouchableOpacity>
        <Text style={styles.title}>
          {(titleConfig?.text as string) || 'Post to'}
        </Text>
      </View>
      <TargetItem
        pageId={pageId}
        displayName={(myTimelineConfig?.text as string) || 'My Timeline'}
        onSelect={() =>
          onSelectFeed({
            targetId: user.userId,
            targetName: (myTimelineConfig?.text as string) || 'My Timeline',
            targetType: 'user',
          })
        }
        avatarFileId={user?.avatarFileId}
      />
      <View style={styles.divider}>
        <Divider
          theme={{ colors: { outlineVariant: theme.colors.baseShade4 } }}
        />
      </View>
      <Text style={styles.communityHeader}>My Communities</Text>
      <FlatList
        data={communities}
        renderItem={renderItem}
        onEndReached={onNextCommunityPage}
        keyExtractor={(item) => item.communityId.toString()}
      />
    </SafeAreaView>
  );
};

export default React.memo(TargetSelectionPage);
