import { EnvironmentsConfigModel } from './models';

export const tokenName = 'firebase-token';
const environments: EnvironmentsConfigModel = {
  DEVELOPMENT: {
    enableLog: true,
    projectId: 'testfirebase-fe46e',
    privateKey:
      '-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQC7q/fzgx/Z8Q2A\nni/+4K8QRjeBXCUyz07HB7l1lnuUt0EHm+uP/e/WfODqODPgiXkXajR3fGabmFwB\nE54HIN97eBo0GfqCWPwAoShifWTQmutrzflwQFlYWIVozhc5s58ByvIpZpnR/Zx3\nndbJSfK0bgfXwpgvMmRvjZHUp8hZ4San5zt3TfDjFylQSbWTE2H+9t4g4swIF8Yr\nlBoqnjkDZxYSn+xEQtydpd3B8yec9kte7Gp3FnEZqzHRYNII5lN3VEohcEVyEjGv\nVikjOB24w+aub62vwwGxcynWh70haj60wwFdeTuqyo7kCenpAyqwcnVj0dt400eh\n4aQzzyPTAgMBAAECgf9abYJmWxOFaLA2/ePIKF0jLwyewMekO2z2PcKXqfniGBB5\nx00UYAs/t91cwhJbPQ+jdOOWzXiFYnsuvlQqoqxX0fCSGz2362TNJRZfi8/p4VJ/\ngWWvkrt6P6WQUuq/4usGW4di4/4rIb1C9NoCI5CDfibBwNTe2fC4SCRl6dv6YwiS\nSi+ojPBFJ6GxtTFyTffx60vnIviGLWefD1m02A93owN7sZFgjqc1+bP2S8XSXzO8\nKqFnaQM6x0Pkj5TVrK9ZZRxafvRl96UTHLjnV9aNCDDiZhLRQk6YrQUI+9uc7yOz\nyUkpo8CPLmL7ln9DqST6yNwRJXFcX3FgvGlvHAECgYEA89eq9N3dIM5kITpukBYJ\nGsCn83axaBnNIJNrQPA7s3WiDKzTqQpC4BFrP00uVlwZ1w4n4Vn/qJaUcZ1RHAnj\nktScNan2XiK1ckL2yphGGtEd1fxCxbcdoAPkva9atvfQzp4uzJ8COGGje35N4URS\namWZn1/wGofzORxG3vALadMCgYEAxQdaz2+A6L8sGAZhTRaPNziufeU8Jr2kCMYy\nECkDLGZ6bMPrCuxXk4189vid0GYKD/0caBEpshCGKKctPx/t5bLKK3OICRnua7Y/\nEtIaltcxhuuMtCCbuSR/OhcN3zONnxxZRDtib6U3bKnJE7Fs4aJH5TeCVBe2eAcA\n5h4PHgECgYACbQbaYMquZN9CJV6sOEvm5DvHhErHilosFMtgXgN6CZWPIrkIWX3I\n1OOIQbBQU6I+LXngGBEfEEBx0OrZqI+HCm5zajl1Pksn09q4sUMhSStO0a+oX+X/\njYpdCL2STGzbYV990acoAHCr7dnAf/mB7XjVyRKOcQPOcaWS2jiC2QKBgBoKjNAZ\n9rnMerF6NmYP80HjNfzhzX95VTLrrzY/lXHK4ad6hZheAH06GCg0V/dxZScT1ytS\nCWbFlFXPMsXDHJhddycjD/nT+ZU280Mzjdwd+SfR/jjYjnx7/GzbGzRDBhbfklTY\nXHxRI/AyyKbXroJsBoCfQ5SFxdI7arz/gBQBAoGBAMgCp1pyRbA98Ci0icKFWxLj\nbAP3v93Ff1oBzGGVXdvf9a3Rzz7vUEfb0WKQLtD+Kpj+rIKr5kS2B4Om/kxvFEnO\njiVrKFvgpNxwW32/ViBbkfdyauSL2Wq44GTF2G4WOKzT2qrGmPcyamib4q8s0DYt\nq1vPIGBUYPhU1EnQKga6\n-----END PRIVATE KEY-----\n',
    clientEmail:
      'firebase-adminsdk-3p205@testfirebase-fe46e.iam.gserviceaccount.com',
    databaseURL: 'https://testfirebase-fe46e.firebaseio.com',
    tokenName,
    limitPage: 2,
  },
  STAGING: {
    enableLog: true,
    projectId: '',
    privateKey: '',
    clientEmail: '',
    databaseURL: '',
    tokenName,
    limitPage: 10,
  },
  PRODUCTION: {
    enableLog: false,
    projectId: '',
    privateKey: '',
    clientEmail: '',
    databaseURL: '',
    tokenName,
    limitPage: 10,
  },
} as const;

/**
 * *******************************
 * *** change environment here ***
 * *******************************
 */
export const config = environments.DEVELOPMENT;
