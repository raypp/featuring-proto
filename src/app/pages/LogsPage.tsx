import { Card } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { ArrowUp, Calendar } from "lucide-react";
import imgVector from "figma:asset/6555fb25422d6991becc1a0e0ae8e0c520ad540b.png";

interface LogEntry {
  id: number;
  automationTitle: string;
  username: string;
  status: 'sent' | 'not_sent';
  timestamp: string;
  profileImage?: string;
}

// Mock data
const MOCK_LOGS: LogEntry[] = [
  { id: 1, automationTitle: '신제품 출시 이벤트 - 12월 프로모션', username: 'user_account_01', status: 'sent', timestamp: '24. 12. 18 14:32', profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop' },
  { id: 2, automationTitle: '크리스마스 특별 할인 쿠폰', username: 'instagram_user_02', status: 'sent', timestamp: '24. 12. 18 14:28', profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  { id: 3, automationTitle: '팔로워 1만 돌파 감사 이벤트', username: 'test_account_03', status: 'not_sent', timestamp: '24. 12. 18 14:15' },
  { id: 4, automationTitle: '신제품 출시 이벤트 - 12월 프로모션', username: 'sample_user_04', status: 'sent', timestamp: '24. 12. 18 13:52', profileImage: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop' },
  { id: 5, automationTitle: '주말 한정 특가 세일', username: 'account_name_05', status: 'sent', timestamp: '24. 12. 18 13:45' },
  { id: 6, automationTitle: '크리스마스 특별 할인 쿠폰', username: 'user_profile_06', status: 'not_sent', timestamp: '24. 12. 18 13:22', profileImage: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop' },
  { id: 7, automationTitle: '브랜드 리뉴얼 기념 사은품 증정', username: 'social_account_07', status: 'sent', timestamp: '24. 12. 18 12:58' },
  { id: 8, automationTitle: '신제품 출시 이벤트 - 12월 프로모션', username: 'insta_user_08', status: 'sent', timestamp: '24. 12. 18 12:35', profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
  { id: 9, automationTitle: '뷰티 체험단 모집 안내', username: 'username_09', status: 'sent', timestamp: '24. 12. 18 12:18' },
  { id: 10, automationTitle: '팔로워 1만 돌파 감사 이벤트', username: 'test_profile_10', status: 'not_sent', timestamp: '24. 12. 18 11:52', profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
  { id: 11, automationTitle: '크리스마스 특별 할인 쿠폰', username: 'account_11', status: 'sent', timestamp: '24. 12. 18 11:28' },
  { id: 12, automationTitle: '신제품 출시 이벤트 - 12월 프로모션', username: 'user_name_12', status: 'sent', timestamp: '24. 12. 18 11:05', profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
  { id: 13, automationTitle: '주말 한정 특가 세일', username: 'instagram_13', status: 'sent', timestamp: '24. 12. 18 10:45' },
  { id: 14, automationTitle: '브랜드 리뉴얼 기념 사은품 증정', username: 'sample_14', status: 'sent', timestamp: '24. 12. 18 10:22', profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
  { id: 15, automationTitle: '뷰티 체험단 모집 안내', username: 'profile_user_15', status: 'not_sent', timestamp: '24. 12. 18 09:58' },
  { id: 16, automationTitle: '팔로워 1만 돌파 감사 이벤트', username: 'account_test_16', status: 'sent', timestamp: '24. 12. 18 09:32', profileImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop' },
  { id: 17, automationTitle: '크리스마스 특별 할인 쿠폰', username: 'user_sample_17', status: 'sent', timestamp: '24. 12. 18 09:15' },
  { id: 18, automationTitle: '신제품 출시 이벤트 - 12월 프로모션', username: 'insta_profile_18', status: 'sent', timestamp: '24. 12. 18 08:52', profileImage: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop' },
  { id: 19, automationTitle: '주말 한정 특가 세일', username: 'username_test_19', status: 'sent', timestamp: '24. 12. 18 08:28' },
  { id: 20, automationTitle: '브랜드 리뉴얼 기념 사은품 증정', username: 'social_user_20', status: 'sent', timestamp: '24. 12. 18 08:05', profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop' },
];

export function LogsPage() {
  // Instagram Badge Avatar Component
  const InstagramAvatar = ({ username, profileImage }: { username: string; profileImage?: string }) => (
    <div className="relative shrink-0 size-[32px]">
      <div className="absolute inset-0 rounded-[999px]">
        <img 
          alt={username} 
          className="absolute inset-0 max-w-none object-center object-cover pointer-events-none rounded-[999px] size-full" 
          src={profileImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'} 
        />
      </div>
      <div className="absolute border border-[#f0f0f0] border-solid inset-0 rounded-[999px]" />
      {/* Instagram Badge */}
      <div className="absolute bg-white bottom-0 overflow-clip right-[-6px] rounded-[999px] size-[16px]">
        <div className="absolute inset-[12.5%]">
          <div className="absolute inset-[6.25%]">
            <img alt="" className="block max-w-none size-full" height="10.5" src={imgVector} width="10.5" />
          </div>
        </div>
        <div className="absolute inset-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="7.5" stroke="#F0F0F0" />
          </svg>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div className="space-y-4">
        <h2 className="text-xl font-medium">자동 DM 발송 로그</h2>
        <p className="text-sm text-[#707070]">시스템이 자동으로 발송한 DM 기록을 확인할 수 있습니다.</p>
      </div>

      {/* Log Table */}
      <Card className="rounded-lg border border-[#f0f0f0]">
        <Table>
          <TableHeader>
            <TableRow className="border-[#f0f0f0] hover:bg-transparent">
              <TableHead className="text-sm font-medium text-[#424242]">
                자동화 제목
              </TableHead>
              <TableHead className="text-sm font-medium text-[#424242]">
                계정명
              </TableHead>
              <TableHead className="text-sm font-medium text-[#424242]">
                상태
              </TableHead>
              <TableHead className="text-sm font-medium text-[#424242]">
                <div className="flex items-center gap-1">
                  동작일시
                  <ArrowUp className="h-3.5 w-3.5" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_LOGS.map((log) => (
              <TableRow 
                key={log.id}
                className="border-[#f0f0f0] hover:bg-gray-50 cursor-pointer"
              >
                <TableCell>
                  <span className="text-sm text-[#424242]">{log.automationTitle}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <InstagramAvatar username={log.username} profileImage={log.profileImage} />
                    <span className="text-sm text-[#424242]">{log.username}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {log.status === 'sent' ? (
                    <Badge className="bg-[#eaf5f1] text-[#3ba974] hover:bg-[#eaf5f1] border-0">
                      발송
                    </Badge>
                  ) : (
                    <Badge className="bg-[#f5f5f5] text-[#707070] hover:bg-[#f5f5f5] border-0">
                      미발송
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <span className="text-sm text-[#424242]">{log.timestamp}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}