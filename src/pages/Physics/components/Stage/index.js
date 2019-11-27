import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { Form, Input } from '@rocketseat/unform';

import './index.css';

import Code from '~/pages/Challenge1/components/Code';
import Car from '~/assets/automobile.svg';

function formattedText(lines) {
  return lines.map(line => (
    <pre>
      <code>{line}</code>
    </pre>
  ));
}

function StageContainer({ width, height, delta, radius }) {
  const [circleX, setCircleX] = useState(width / 2);
  const [animationTime, setAnimationTime] = useState(0);
  const [codeBlocks, setCodeBlocks] = useState([]);

  function runAnimation(data) {
    const distance = parseInt(data.distance, 10);
    const time = parseInt(data.time, 10);

    setAnimationTime(time);
    setCircleX(width / 2 + distance);
    setCodeBlocks([
      ...codeBlocks,
      formattedText([
        'function velocidade(distancia, tempo) {',
        'return distancia / tempo',
        '}',
      ]),
    ]);
  }

  return (
    <div>
      <div className="container-top">
        <div className="container-code">
          <Code codeBlocks={codeBlocks} />
        </div>
        <div width={width} height={height} className="container-events">
          <div className="road">
            <motion.img
              key={Car}
              src={Car}
              style={{
                width: 100,
                height: 100,
                margin: '0 auto',
                borderRadius: '50%',
              }}
              animate={{ x: circleX, y: '30px' }}
              transition={{ duration: animationTime }}
            />
          </div>
        </div>
      </div>
      <div className="container-bottom">
        <div className="keyboard-container">
          <Form onSubmit={runAnimation}>
            <div className="input-wrapper">
              <p>Distância</p>
              <Input type="number" name="distance" id="distance" max="255" />
            </div>
            <div className="input-wrapper">
              <p>Tempo</p>
              <Input type="number" name="time" id="time" max="30" />
            </div>
            <button type="submit">Vai!</button>
          </Form>
        </div>
        <div className="tips-container">
          <p>Estamos dando dicas</p>
        </div>
      </div>
    </div>
  );
}

export default StageContainer;