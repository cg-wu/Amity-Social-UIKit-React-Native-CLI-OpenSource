import React, { FC, memo } from 'react';
import { View } from 'react-native';
import AmityStoryTabComponent from '../AmityStoryTabComponent/AmityStoryTabComponent';
import { AmityStoryTabComponentEnum } from '../../types';
import useConfig from '../../../hook/useConfig';
import { ComponentID, PageID } from '../../../enum/enumUIKitID';
import AmityGlobalFeedComponent from '../AmityGlobalFeedComponent/AmityGlobalFeedComponent';

type AmityNewsFeedComponentType = {
  pageId?: PageID;
};

const AmityNewsFeedComponent: FC<AmityNewsFeedComponentType> = ({
  pageId = PageID.WildCardPage,
}) => {
  const { excludes } = useConfig();
  const componentId = ComponentID.newsfeed_component;
  const uiReference = `${pageId}/${componentId}/*`;

  if (excludes.includes(uiReference)) return null;

  return (
    <View testID={uiReference} accessibilityLabel={uiReference}>
      <AmityStoryTabComponent type={AmityStoryTabComponentEnum.globalFeed} />
      <AmityGlobalFeedComponent pageId={pageId} />
    </View>
  );
};

export default memo(AmityNewsFeedComponent);
