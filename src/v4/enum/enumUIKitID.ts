export enum PageID {
  SelectTargetPage = 'select_target_page/*/*',
  CameraPage = 'camera_page/*/*',
  StoryPage = 'story_page/*/*',
  CreateStoryPage = 'create_story_page/*/*',
}
export enum ComponentID {
  EditComment = '*/edit_comment_component/*',
  HyperLinkConfig = '*/hyper_link_config_component/*',
  CommentTray = '*/comment_tray_component/*',
  StoryTab = '*/story_tab_component/*',
}
export enum ElementID {
  BackBtnOnSelectTargetPage = 'select_target_page/*/back_button',
  CloseBtnOnCameraPage = 'camera_page/*/close_button',
  BackBtnOnCreateStoryPage = 'create_story_page/*/back_button',
  AspectRatioBtnOnCreateStoryPage = 'create_story_page/*/aspect_ratio_button',
  StoryHyperLinkBtnOnCreateStoryPage = 'create_story_page/*/story_hyperlink_button',
  HyperLinkOnCreateStoryPage = 'create_story_page/*/hyper_link',
  ShareStoryBtnOnCreateStoryPage = 'create_story_page/*/share_story_button',
  ProgressBarOnCreateStoryPage = 'story_page/*/progress_bar',
  OverFlowMenuOnStoryPage = 'story_page/*/overflow_menu',
  CloseBtnOnStoryPage = 'story_page/*/close_button',
  StoryImpressionBtnOnStoryPage = 'story_page/*/story_impression_button',
  StoryCommentBtnOnStoryPage = 'story_page/*/story_comment_button',
  StoryReactionBtnOnStoryPage = 'story_page/*/story_reaction_button',
  CreateNewStoryBtnOnStoryPage = 'story_page/*/create_new_story_button',
  SpeakerBtnOnStoryPage = 'story_page/*/speaker_button',
  CancelBtnOnEditComment = '*/edit_comment_component/cancel_button',
  SaveBtnOnEditComment = '*/edit_comment_component/save_button',
  DoneBtnOnHyperLinkConfig = '*/hyper_link_config_component/done_button',
  CancelBtnOnHyperLinkConfig = '*/hyper_link_config_component/cancel_button',
  StoryRingOnStoryTab = '*/story_tab_component/story_ring',
  CreateNewStoryBtnOnStoryTab = '*/story_tab_component/create_new_story_button',
  CloseBtnOnAllPage = '*/*/close_button',
}

export const DefaultConfigID = {
  ...PageID,
  ...ComponentID,
  ...ElementID,
};
type DefaultConfigID = typeof DefaultConfigID;
