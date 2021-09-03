import React, {useEffect, useState, forwardRef} from 'react';
import {makeStyles, Card, CardMedia, CardContent, Typography} from '@material-ui/core';
import {useAppState} from '../../state';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'overlay',
    borderBottom: '1px solid transparent',
    transition: theme.transitions.create(['border-color', 'transform'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.short
    })
  },
  rootOnScroll: {
    borderBottomColor: theme.palette.divider
  },
  rootAfter: {
    transform: 'translateX(100%)'
  },
  rootBefore: {
    transform: 'translateX(-100%)'
  },
  rootShown: {
    transform: 'translateX(0)'
  },
  media: {
    position: 'sticky',
    top: 0,
    left: 0,
    paddingTop: '57.4%',
    width: '100%',
    '&:after': {
      content: '""',
      width: '100%',
      height: theme.spacing(9),
      top: 0,
      left: 0,
      backgroundImage:
        'linear-gradient(to top, rgba(22, 39, 69, 0.02), rgba(22, 39, 69, 0.64) 63%, rgba(22, 39, 69, 0.92))',
      position: 'absolute'
    }
  },
  content: {
    padding: theme.spacing(4, 6),
    flex: 1,
    zIndex: 1,
    backgroundColor: theme.palette.grey[50]
  },
  pretitle: {
    padding: theme.spacing(1, 0, 0.5),
    borderTop: `2px solid ${theme.palette.primary.main}`,
    fontWeight: 600,
    display: 'inline-block'
  },
  title: {
    color: theme.palette.primary.dark,
    marginBottom: theme.spacing(2)
  },
  subtitle: {
    color: theme.palette.primary.dark,
    marginBottom: theme.spacing(4.5)
  }
}));

const SidebarSlide = ({title, subtitle, text, image, slide}, cardRef) => {
  const classes = useStyles();
  const [isOnScroll, setIsOnScroll] = useState(false);
  const {currentSlide, slidesNumber} = useAppState();

  useEffect(() => {
    if (cardRef?.current) {
      const item = cardRef.current;

      const scrollListener = () => {
        const hasScroll = item.scrollHeight > item.clientHeight;
        setIsOnScroll(hasScroll ? item.clientHeight + item.scrollTop < item.scrollHeight : false);
      };
      item.addEventListener('scroll', scrollListener);
      scrollListener();
      return () => {
        item?.removeEventListener('scroll', scrollListener);
      };
    }
  }, [cardRef, setIsOnScroll]);

  return (
    <Card
      ref={cardRef}
      square={true}
      elevation={0}
      className={[
        classes.root,
        isOnScroll ? classes.rootOnScroll : '',
        slide > currentSlide ? classes.rootAfter : classes.rootBefore,
        (slide === 1 && currentSlide === 0) || slide === currentSlide ? classes.rootShown : ''
      ].join(' ')}
    >
      <CardMedia className={classes.media} image={image} title={title} />
      <CardContent data-content="true" classes={{root: classes.content}}>
        <Typography
          className={classes.pretitle}
          variant="overline"
          color="primary"
          component="span"
        >
          {`Fact ${slide} of ${slidesNumber - 1}`}
        </Typography>
        <Typography className={classes.title} variant="h5" color="primary" component="h2">
          {title}
        </Typography>
        <Typography className={classes.subtitle} variant="body1" color="primary" component="h3">
          {subtitle}
        </Typography>
        <Typography variant="body2" color="textPrimary" component="p">
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default forwardRef(SidebarSlide);
