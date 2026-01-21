import { ResumeWrapper, ResumePaper, ResumePaperScaler } from "./Resume.styles"
import { Text } from "@/shared/ui/atoms";
import dayjs from "dayjs";

// 一時的なモックデータ
const resume = {
  id: 'sample',
  name: '新規履歴書',
  isPublished: true,
  updatedAt: '2026-01-04',
  values: {
    name: '山田花子',
    nameRuby: 'やまだはなこ',
    birthdate: '20000101',
    gender: '女',
    address: {
      postalCode: '0010001',
      line1: 'xx県xx区xxx-xx',
      line2: 'マンション名xx号室',
      line1Ruby: 'xxけんxxくxxx-xx',
      line2Ruby: 'マンションxxごうしつ',
      tel: '001xxxxxxxx',
      email: 'xxx@xxx.xx',
    },
    educations: {
      ids: ['edu_1', 'edu_2'],
      entities: {
        edu_1: {
          year: '2000',
          month: '1',
          content: '学歴x',
        },
        edu_2: {
          year: '2001',
          month: '2',
          content: '学歴xx',
        },
      },
    },
    experiences: {
      ids: ['exp_1', 'exp_2'],
      entities: {
        exp_1: {
          year: '2002',
          month: '3',
          content: '職歴x',
        },
        exp_2: {
          year: '2004',
          month: '4',
          content: '職歴xx',
        },
      },
    },
    customs: {
      ids: ['cus_1', 'cus_2'],
      entities: {
        cus_1: {
          label: '志望動機',
          content: 'xxxxxxxxxxxx',
        },
        cus_2: {
          label: '本人希望記入欄',
          content: 'xxxxxxxxxxxx',
        },
      },
    },
    customP1: 'xxx',
    customP1Ruby: 'xxx',
  }, 
};
type Resume = typeof resume;


type Props = {
  scale: number;
};

export const Resume = (props: Props) => {
  const { scale } = props;

  return (
    <ResumeWrapper>
      {/* 一枚目 */}
      <ResumePaperScaler $scale={ scale }>
        <ResumePaper>
        </ResumePaper>
      </ResumePaperScaler>

      {/* 二枚目 */}
      <ResumePaperScaler $scale={ scale }>
        <ResumePaper>
        </ResumePaper>
      </ResumePaperScaler>
    </ResumeWrapper>
  );
};
