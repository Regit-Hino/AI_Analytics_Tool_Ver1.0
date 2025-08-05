export interface DiagnosisData {
  timestamp: string;
  company: string;
  industry: string;
  headcount: string;
  name: string;
  email: string;
  answers: Record<number, number | string>;
  total_score: number;
  tier: string;
  remarks: string;
}

export async function sendDiagnosisData(data: DiagnosisData): Promise<boolean> {
  const endpoint = import.meta.env.VITE_SAVE_ENDPOINT;
  
  if (!endpoint) {
    console.warn('Save endpoint not configured');
    return false;
  }

  // First attempt: Try no-cors mode directly
  try {
    console.log('Sending diagnosis data to:', endpoint);
    console.log('Data being sent:', JSON.stringify(data, null, 2));
    
    await fetch(endpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(data),
    });
    
    console.log('Request sent successfully in no-cors mode');
    // In no-cors mode, we can't read the response, so we assume success
    return true;
  } catch (error) {
    console.error('Failed to send diagnosis data:', error);
    
    // Second attempt: Try with FormData
    try {
      console.log('Retrying with FormData...');
      const formData = new FormData();
      formData.append('data', JSON.stringify(data));
      
      await fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      });
      
      console.log('Request sent successfully with FormData');
      return true;
    } catch (formError) {
      console.error('FormData request also failed:', formError);
      
      // Third attempt: Try with URL parameters
      try {
        console.log('Final attempt with URL parameters...');
        const params = new URLSearchParams();
        params.append('data', JSON.stringify(data));
        
        await fetch(endpoint, {
          method: 'POST',
          mode: 'no-cors',
          body: params,
        });
        
        console.log('Request sent successfully with URL parameters');
        return true;
      } catch (finalError) {
        console.error('All attempts failed:', finalError);
        return false;
      }
    }
  }
}

export function prepareDiagnosisData(
  company: string,
  industry: string,
  headcount: string,
  name: string,
  email: string,
  answers: Record<number, number | string>,
  totalScore: number,
  tier: string,
  remarks: string
): DiagnosisData {
  // Get current date in JST
  const now = new Date();
  const jstOffset = 9 * 60; // JST is UTC+9
  const jstTime = new Date(now.getTime() + (jstOffset * 60 * 1000));
  
  // Format as YYYY-MM-DD HH:mm:ss
  const year = jstTime.getUTCFullYear();
  const month = String(jstTime.getUTCMonth() + 1).padStart(2, '0');
  const day = String(jstTime.getUTCDate()).padStart(2, '0');
  const hours = String(jstTime.getUTCHours()).padStart(2, '0');
  const minutes = String(jstTime.getUTCMinutes()).padStart(2, '0');
  const seconds = String(jstTime.getUTCSeconds()).padStart(2, '0');
  
  const timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
  return {
    timestamp,
    company,
    industry,
    headcount,
    name,
    email,
    answers,
    total_score: totalScore,
    tier,
    remarks
  };
}

export function createTestData(): DiagnosisData {
  const mockAnswers: Record<string, number> = {
    "q1": 2,
    "q2": 1,
    "q3": 0,
    "q4": 1,
    "q5": 2,
    "q6": 1,
    "q7": 0,
    "q8": 1,
    "q9": 2,
    "q10": 0,
    "q11": 1,
    "q12": 1,
    "q13": 2,
    "q14": 1,
    "q15": 2
  };

  // Get current date in JST
  const now = new Date();
  const jstOffset = 9 * 60; // JST is UTC+9
  const jstTime = new Date(now.getTime() + (jstOffset * 60 * 1000));
  
  // Format as YYYY-MM-DD HH:mm:ss
  const year = jstTime.getUTCFullYear();
  const month = String(jstTime.getUTCMonth() + 1).padStart(2, '0');
  const day = String(jstTime.getUTCDate()).padStart(2, '0');
  const hours = String(jstTime.getUTCHours()).padStart(2, '0');
  const minutes = String(jstTime.getUTCMinutes()).padStart(2, '0');
  const seconds = String(jstTime.getUTCSeconds()).padStart(2, '0');
  
  const timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return {
    timestamp,
    company: "テスト株式会社",
    industry: "IT",
    headcount: "101-500",
    name: "テスト 太郎",
    email: "test@example.com",
    answers: mockAnswers,
    total_score: 78,
    tier: "★★",
    remarks: "テスト用のヒアリングメモです。"
  };
}

export async function sendTestSubmission(): Promise<boolean> {
  const testData = createTestData();
  
  try {
    const success = await sendDiagnosisData(testData);
    if (success) {
      alert("送信完了（スプレッドシートを確認してください）");
    } else {
      alert("送信に失敗しました。GASエンドポイントを確認してください");
    }
    return success;
  } catch (error) {
    console.error('Test submission error:', error);
    alert("送信に失敗しました。GASエンドポイントを確認してください");
    return false;
  }
}