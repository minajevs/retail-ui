// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Loader from '../Loader';
import Tooltip from '../../Tooltip';
import Input from '../../Input';
import Modal from '../../Modal';
import Hint from '../../Hint';
import Button from '../../Button';
import Select from '../../Select';

function getItems(count: number) {
  const items = [];
  for (let i = 0; i < count; i += 1) {
    items.push(i);
  }
  return items;
}

const wrapperStyle = {
  width: '800px',
  background: 'AliceBlue',
};

class ContentComponent extends React.Component<{
  itemsCount: number;
  additionalStyle?: object;
}> {
  public render() {
    return (
      <div style={{ ...wrapperStyle, ...this.props.additionalStyle }}>
        <Loader active type={'big'}>
          {getItems(this.props.itemsCount).map(i => (
            <div key={i}>{i}</div>
          ))}
        </Loader>
      </div>
    );
  }
}

class ButtonHint extends React.Component {
  public state = {
    opened: false,
  };

  public renderModal() {
    return (
      <Modal onClose={this.close}>
        <Modal.Header>Title</Modal.Header>
        <Modal.Body>
          <p>
            Use rxjs operators with react hooks. Use rxjs operators with react hooksUse rxjs operators with react
            hooksUse rxjs operators with react hooksUse rxjs operators with react hooksUse rxjs operators with react
            hooksUse rxjs operators with react hooksUse rxjs operators with react hooksUse rxjs operators with react
            hooks
          </p>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </Modal.Body>
        <Modal.Footer panel={true}>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  public open = () => {
    this.setState({ opened: true });
  };

  public close = () => {
    this.setState({ opened: false });
  };

  public render() {
    return (
      <div style={{ padding: '100px' }}>
        {this.state.opened && this.renderModal()}
        <Hint text="Text">
          <Button onClick={this.open}>Open</Button>
        </Hint>
      </div>
    );
  }
}

storiesOf('Loader', module)
  .add('Simple', () => <Loader active />)
  .add('Type "big"', () => <ContentComponent itemsCount={10} />)
  .add('Type "big" with text', () => (
    <div style={{ width: 400 }}>
      <h1>
        Yeah, and if you were the pope they'd be all, "Straighten your pope hat." And "Put on your good vestments."
      </h1>
      <p>
        No, I'm Santa Claus! I guess if you want children beaten, you have to do it yourself. We're also Santa Claus!
        Leela, Bender, we're going grave robbing.
      </p>
      <p>
        Are you crazy? I can't swallow that. Large bet on myself in round one. Hey, whatcha watching?{' '}
        <strong> Moving along… I guess if you want children beaten, you have to do it yourself.</strong>
        <em>It's okay, Bender.</em> I like cooking too.
      </p>
      <h2>Oh, I think we should just stay friends.</h2>
      <p>
        No argument here. And when we woke up, we had these bodies. You guys go on without me! I'm going to go… look for
        more stuff to steal! Oh, how awful. Did he at least die painlessly? …To shreds, you say. Well, how is his wife
        holding up? …To shreds, you say.
      </p>
      <ol>
        <li>No! The kind with looting and maybe starting a few fires!</li>
        <li>You are the last hope of the universe.</li>
        <li>Hey, guess what you're accessories to.</li>
      </ol>
      <Loader active type={'big'}>
        <h1>
          Yeah, and if you were the pope they'd be all, "Straighten your pope hat." And "Put on your good vestments."
        </h1>
        <p>
          No, I'm Santa Claus! I guess if you want children beaten, you have to do it yourself. We're also Santa Claus!
          Leela, Bender, we're going grave robbing.
        </p>
        <p>
          Are you crazy? I can't swallow that. Large bet on myself in round one. Hey, whatcha watching?{' '}
          <strong> Moving along… I guess if you want children beaten, you have to do it yourself.</strong>
          <em>It's okay, Bender.</em> I like cooking too.
        </p>
        <h2>Oh, I think we should just stay friends.</h2>
        <p>
          No argument here. And when we woke up, we had these bodies. You guys go on without me! I'm going to go… look
          for more stuff to steal! Oh, how awful. Did he at least die painlessly? …To shreds, you say. Well, how is his
          wife holding up? …To shreds, you say.
        </p>
        <ol>
          <li>No! The kind with looting and maybe starting a few fires!</li>
          <li>You are the last hope of the universe.</li>
          <li>Hey, guess what you're accessories to.</li>
        </ol>
      </Loader>
      <h1>
        Yeah, and if you were the pope they'd be all, "Straighten your pope hat." And "Put on your good vestments."
      </h1>
      <p>
        No, I'm Santa Claus! I guess if you want children beaten, you have to do it yourself. We're also Santa Claus!
        Leela, Bender, we're going grave robbing.
      </p>
      <p>
        Are you crazy? I can't swallow that. Large bet on myself in round one. Hey, whatcha watching?{' '}
        <strong> Moving along… I guess if you want children beaten, you have to do it yourself.</strong>
        <em>It's okay, Bender.</em> I like cooking too.
      </p>
      <h2>Oh, I think we should just stay friends.</h2>
      <p>
        No argument here. And when we woke up, we had these bodies. You guys go on without me! I'm going to go… look for
        more stuff to steal! Oh, how awful. Did he at least die painlessly? …To shreds, you say. Well, how is his wife
        holding up? …To shreds, you say.
      </p>
      <ol>
        <li>No! The kind with looting and maybe starting a few fires!</li>
        <li>You are the last hope of the universe.</li>
        <li>Hey, guess what you're accessories to.</li>
      </ol>
    </div>
  ))
  .add('Vertical scroll', () => <ContentComponent itemsCount={200} />)
  .add('Horizontal scroll', () => <ContentComponent itemsCount={10} additionalStyle={{ width: '2500px' }} />)
  .add('Both dimensions scrollable content with spaces around', () => (
    <ContentComponent itemsCount={200} additionalStyle={{ width: '2500px', margin: '600px 200px' }} />
  ))
  .add('story1', () => (
    <div style={{ width: '500px' }}>
      <Loader type="big" active>
        <div style={{ height: 100 }} />
        <Tooltip render={() => 'Hello'} trigger="opened" pos="top right">
          <Input />
        </Tooltip>
      </Loader>
    </div>
  ))
  .add('story2', () => <ButtonHint />)
  .add('Loader and Modal', () => (
    <Modal>
      <Modal.Header>Title</Modal.Header>
      <Modal.Body>
        <Loader active type="big">
          Body
        </Loader>
      </Modal.Body>
      <Modal.Footer panel={true}>Footer</Modal.Footer>
    </Modal>
  ))
  .add('Tooltip and Modal', () => (
    <Modal onClose={close} width="400px">
      <Modal.Header>Title</Modal.Header>
      <Modal.Body>
        <div style={{ height: '1000px' }} />
        <Tooltip
          render={() => (
            <div style={{ width: 250 }}>
              Задача организации, в особенности же рамки и место обучения кадров влечет за собой процесс внедрения и
              модернизации форм развития.
            </div>
          )}
          pos="right top"
          trigger={'opened'}
        >
          <Button size={'medium'}>Menu</Button>
        </Tooltip>
      </Modal.Body>
      <Modal.Footer panel>
        <Button onClick={close}>Close</Button>
      </Modal.Footer>
    </Modal>
  ))
  .add('Tooltip and DropdownMenu', () => {
    const render = () => (
      <div
        style={{
          width: 250,
          fontSize: 14,
          fontFamily: 'Segoe UI',
        }}
      >
        Задача организации, в особенности же рамки и место обучения кадров влечет за собой процесс внедрения и
        модернизации форм развития.
      </div>
    );

    return (
      <Tooltip render={render} pos="bottom right">
        <Select width={120} value={'small'} items={['small', 'medium', 'large']} size={'small'} />
      </Tooltip>
    );
  });
