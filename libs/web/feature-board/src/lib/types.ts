// TODO- move to shared/types

enum DarumaColor {
  RED = 'red',
  BLUE = 'blue',
  GREEN = 'green',
  YELLOW = 'yellow',
  PURPLE = 'purple',
  ORANGE = 'orange',
  PINK = 'pink',
  BROWN = 'brown',
  BLACK = 'black',
  WHITE = 'white',
}

enum DarumaDescription {
  RED = 'Family Safety, Overall life improvement',
  BLUE = 'Achievment of independence, self-reliance',
  GREEN = 'Good Health, Victory in sports',
  YELLOW = 'Prospertiy, Fame, and honor',
  PURPLE = 'purple',
  ORANGE = 'orange',
  PINK = 'Strong relationships, good luck',
  BROWN = 'Victory, Great Achievment',
  BLACK = 'Avoidance of natural disasters',
  WHITE = 'Scholoastic advancement',
}

interface Daruma {
  color: DarumaColor;
  description: DarumaDescription;
}

const darumas = {
  [DarumaColor.RED]: {
    color: DarumaColor.RED,
    description: DarumaDescription.RED,
  },
  [DarumaColor.BLUE]: {
    color: DarumaColor.BLUE,
    description: DarumaDescription.BLUE,
  },
  [DarumaColor.GREEN]: {
    color: DarumaColor.GREEN,
    description: DarumaDescription.GREEN,
  },
  [DarumaColor.YELLOW]: {
    color: DarumaColor.YELLOW,
    description: DarumaDescription.YELLOW,
  },
  [DarumaColor.PURPLE]: {
    color: DarumaColor.PURPLE,
    description: DarumaDescription.PURPLE,
  },
  [DarumaColor.ORANGE]: {
    color: DarumaColor.ORANGE,
    description: DarumaDescription.ORANGE,
  },
  [DarumaColor.PINK]: {
    color: DarumaColor.PINK,
    description: DarumaDescription.PINK,
  },
  [DarumaColor.BROWN]: {
    color: DarumaColor.BROWN,
    description: DarumaDescription.BROWN,
  },
  [DarumaColor.BLACK]: {
    color: DarumaColor.BLACK,
    description: DarumaDescription.BLACK,
  },
  [DarumaColor.WHITE]: {
    color: DarumaColor.WHITE,
    description: DarumaDescription.WHITE,
  },
};
