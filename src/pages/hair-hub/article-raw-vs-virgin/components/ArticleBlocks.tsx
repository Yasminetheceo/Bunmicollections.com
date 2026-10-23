import type { ReactNode } from 'react';

export const SectionHeading = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center gap-3 mb-8">
    <span className="w-8 h-[2px] bg-[#631D26] flex-shrink-0" />
    <h2 className="font-['Bebas_Neue'] text-xl tracking-[0.2em] text-[#631D26] uppercase">{children}</h2>
  </div>
);

export const SubHeading = ({ children }: { children: ReactNode }) => (
  <p className="font-['Bebas_Neue'] text-base tracking-[0.15em] text-[#631D26] uppercase mb-3">{children}</p>
);

interface TwoWaySplitProps {
  leftLabel: string;
  leftText: string;
  rightLabel: string;
  rightText: string;
}

export const TwoWaySplit = ({ leftLabel, leftText, rightLabel, rightText }: TwoWaySplitProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-8">
    <div className="bg-[#FAF8F5] rounded-xl p-6 border-t-2 border-[#631D26]">
      <p className="font-['Bebas_Neue'] text-sm tracking-[0.15em] text-[#631D26] uppercase mb-3">{leftLabel}</p>
      <p className="font-['Inter'] text-sm text-gray-700 leading-[1.8]">{leftText}</p>
    </div>
    <div className="bg-[#FAF8F5] rounded-xl p-6 border-t-2 border-[#D19B6D]">
      <p className="font-['Bebas_Neue'] text-sm tracking-[0.15em] text-[#631D26] uppercase mb-3">{rightLabel}</p>
      <p className="font-['Inter'] text-sm text-gray-700 leading-[1.8]">{rightText}</p>
    </div>
  </div>
);

interface ChoiceColumnsProps {
  leftLabel: string;
  leftItems: string[];
  rightLabel: string;
  rightItems: string[];
}

export const ChoiceColumns = ({ leftLabel, leftItems, rightLabel, rightItems }: ChoiceColumnsProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
    <div className="rounded-xl overflow-hidden border border-[#631D26]/15">
      <div className="px-5 py-3 bg-[#631D26]">
        <p className="font-['Bebas_Neue'] text-sm tracking-[0.15em] text-[#D19B6D] uppercase">{leftLabel}</p>
      </div>
      <ul className="px-5 py-4 space-y-3 bg-[#FAF8F5]">
        {leftItems.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
              <i className="ri-checkbox-circle-fill text-[#631D26] text-base"></i>
            </span>
            <span className="font-['Inter'] text-sm text-gray-700 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
    <div className="rounded-xl overflow-hidden border border-[#D19B6D]/30">
      <div className="px-5 py-3 bg-[#D19B6D]">
        <p className="font-['Bebas_Neue'] text-sm tracking-[0.15em] text-[#631D26] uppercase">{rightLabel}</p>
      </div>
      <ul className="px-5 py-4 space-y-3 bg-white">
        {rightItems.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
              <i className="ri-checkbox-circle-fill text-[#D19B6D] text-base"></i>
            </span>
            <span className="font-['Inter'] text-sm text-gray-700 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

interface CalloutProps {
  children: ReactNode;
}

export const Callout = ({ children }: CalloutProps) => (
  <div className="my-8 pl-6 border-l-4 border-[#D19B6D] bg-[#FAF8F5] py-6 pr-6 rounded-r-lg">
    <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] italic">{children}</p>
  </div>
);

export const AskYourself = ({ children }: CalloutProps) => (
  <div className="flex items-start gap-3 my-7 bg-[#631D26]/[0.05] rounded-lg px-5 py-4">
    <span className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
      <i className="ri-question-line text-[#D19B6D] text-lg"></i>
    </span>
    <p className="font-['Inter'] text-sm text-gray-700 leading-relaxed">
      <span className="font-semibold text-[#631D26]">Ask yourself: </span>
      {children}
    </p>
  </div>
);