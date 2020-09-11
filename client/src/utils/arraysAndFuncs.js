export const optionsArray = [
  { key: 'fb', text: 'Facebook', value: 'Facebook', icon: 'facebook' },
  { key: 'ig', text: 'Instagram', value: 'Instagram', icon: 'instagram' },
  { key: 'tw', text: 'Twitter', value: 'Twitter', icon: 'twitter' },
  { key: 'gh', text: 'Github', value: 'Github', icon: 'github' },
  { key: 'yt', text: 'Youtube', value: 'Youtube', icon: 'youtube' },
];

export const siteIconsArray = [
  'facebook',
  'github',
  'youtube',
  'twitter',
  'instagram',
  'blogger',
  'linkedin',
  'reddit',
];

const labelColors = [
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'teal',
  'blue',
  'violet',
  'purple',
  'pink',
  'brown',
  'grey',
  'black',
];

export const randomColor = () => {
  return labelColors[Math.floor(Math.random() * labelColors.length)];
};

export const getCircularAvatar = (imageLink) => {
  const firstPart = imageLink.split('image/upload/')[0];
  const secondPart = imageLink.split('image/upload/')[1];
  const transformApi = 'w_200,h_200,c_fill,r_max/e_trim/';

  return [firstPart, transformApi, secondPart].join('');
};
