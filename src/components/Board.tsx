import React from 'react';

interface LevelData {
  name: string;
  level: number;
  idTransaction: string;
  commission: number;
}

interface Props {
  data: LevelData[];
}

const Board = ({ data }: Props) => {
  return (
    <div className="mx-auto rounded-lg overflow-auto text-white w-3/4 my-5">
      <h2 className="text-center text-2xl font-bold py-4 bg-gray-900">Commissions per Transaction</h2>
      <div className="table-header flex bg-gray-800">
        <div className="header-item flex-1 py-2 text-center">Name</div>
        <div className="header-item flex-1 py-2 text-center">Level</div>
        <div className="header-item flex-1 py-2 text-center">Id Transaction</div>
        <div className="header-item flex-1 py-2 text-center">Commission</div>
      </div>
      <div className="table-body">
        {data.map((item, index) => (
          <div key={index} className="flex bg-gray-700">
            <div className="row-item flex-1 py-2 text-center">{item.name}</div>
            <div className="row-item flex-1 py-2 text-center">{item.level}</div>
            <div className="row-item flex-1 py-2 text-center">{item.idTransaction}</div>
            <div className="row-item flex-1 py-2 text-center">{item.commission}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
