// GAS デバッグテスト
const GAS_URL = 'https://script.google.com/macros/s/AKfycbziuZzkU3S0c_DZKmVrfIRV9YR4U_8EDQR6Ggkq8qcX792IeEcC9Hiyq2OdoK53cc3rPw/exec';

// 一意のタイムスタンプを生成
const uniqueTimestamp = new Date().toISOString();
const uniqueCompany = `デバッグテスト_${Date.now()}`;

console.log('=== GAS デバッグテスト開始 ===');
console.log('ユニークな会社名:', uniqueCompany);
console.log('タイムスタンプ:', uniqueTimestamp);
console.log('');

const testData = {
    timestamp: uniqueTimestamp,
    company: uniqueCompany,
    industry: "IT",
    headcount: "101-500",
    name: "デバッグ 太郎",
    email: "debug@example.com",
    answers: {
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
    },
    total_score: 78,
    tier: "★★"
};

async function runDebugTest() {
    // 1. GET リクエストテスト
    console.log('1. GET リクエストテスト...');
    try {
        const response = await fetch(GAS_URL);
        const text = await response.text();
        console.log('GET レスポンス:', text);
        console.log('');
    } catch (error) {
        console.error('GET エラー:', error);
        console.log('');
    }

    // 2. POST リクエスト（3つの方法）
    console.log('2. POST リクエストテスト...');
    
    // 方法1: JSON + no-cors
    try {
        console.log('  方法1: JSON + no-cors');
        await fetch(GAS_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: JSON.stringify(testData),
        });
        console.log('  ✓ 送信完了');
    } catch (error) {
        console.error('  ✗ エラー:', error.message);
    }

    // 方法2: FormData + no-cors
    try {
        console.log('  方法2: FormData + no-cors');
        const formData = new FormData();
        formData.append('data', JSON.stringify(testData));
        
        await fetch(GAS_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: formData,
        });
        console.log('  ✓ 送信完了');
    } catch (error) {
        console.error('  ✗ エラー:', error.message);
    }

    // 方法3: URLSearchParams + no-cors
    try {
        console.log('  方法3: URLSearchParams + no-cors');
        const params = new URLSearchParams();
        params.append('data', JSON.stringify(testData));
        
        await fetch(GAS_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: params,
        });
        console.log('  ✓ 送信完了');
    } catch (error) {
        console.error('  ✗ エラー:', error.message);
    }

    console.log('');
    console.log('=== テスト完了 ===');
    console.log('');
    console.log('📋 スプレッドシートで以下のデータを探してください:');
    console.log(`  会社名: ${uniqueCompany}`);
    console.log(`  時刻: ${uniqueTimestamp}`);
    console.log('');
    console.log('データが見つからない場合:');
    console.log('1. GASが再デプロイされているか確認');
    console.log('2. GASの実行ログでエラーを確認');
    console.log('3. スプレッドシートの「回答一覧」シートが存在するか確認');
}

runDebugTest();